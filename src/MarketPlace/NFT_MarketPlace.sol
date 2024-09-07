// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is Ownable, ERC1155Receiver {
    struct Listing {
        address seller;
        uint256 price;        // In wei
        uint256 quantity;     // Number of NFTs for sale
        bool isListed;
    }

    struct Trade {
        address buyer;
        address seller;
        uint256 tokenId;
        uint256 quantity;
        uint256 price;        // In wei
        uint256 timestamp;
    }

    // Mappings
    mapping(uint256 => Listing[]) public nftListings;         // tokenId => Listing[]
    mapping(address => uint256) public proceeds;              // seller's address => total proceeds
    Trade[] public tradeHistory;                              // Keeps record of all trade history

    event NFTListed(address indexed seller, uint256 indexed tokenId, uint256 price, uint256 quantity);
    event NFTBought(address indexed buyer, uint256 indexed tokenId, uint256 quantity, uint256 price);
    event SaleWithdrawn(address indexed seller, uint256 amount);

    IERC1155 public nftContract;

    constructor(address _nftContract) {
        nftContract = IERC1155(_nftContract);
    }

    // Function to list NFTs
    function listNFT(uint256 tokenId, uint256 price, uint256 quantity) external {
        require(nftContract.balanceOf(msg.sender, tokenId) >= quantity, "Not enough NFTs owned");
        require(price > 0, "Price must be greater than zero");

        // Create a listing for the given tokenId
        nftListings[tokenId].push(Listing({
            seller: msg.sender,
            price: price,
            quantity: quantity,
            isListed: true
        }));

        // Transfer the NFTs to the contract for listing
        nftContract.safeTransferFrom(msg.sender, address(this), tokenId, quantity, "");

        emit NFTListed(msg.sender, tokenId, price, quantity);
    }

    // Function to buy listed NFTs
    function buyNFT(uint256 tokenId, uint256 listingIndex, uint256 quantity) external payable {
        Listing storage listing = nftListings[tokenId][listingIndex];

        require(listing.isListed, "NFT is not listed for sale");
        require(quantity <= listing.quantity, "Not enough quantity available");
        require(msg.value == listing.price * quantity, "Incorrect price");

        // Update seller's proceeds
        proceeds[listing.seller] += msg.value;

        // Transfer the NFT to the buyer
        nftContract.safeTransferFrom(address(this), msg.sender, tokenId, quantity, "");

        // Update the quantity left in the listing
        listing.quantity -= quantity;
        if (listing.quantity == 0) {
            listing.isListed = false;
        }

        // Add to trade history
        tradeHistory.push(Trade({
            buyer: msg.sender,
            seller: listing.seller,
            tokenId: tokenId,
            quantity: quantity,
            price: listing.price,
            timestamp: block.timestamp
        }));

        emit NFTBought(msg.sender, tokenId, quantity, listing.price);
    }

    // Withdraw sales proceeds
    function withdrawProceeds() external {
        uint256 amount = proceeds[msg.sender];
        require(amount > 0, "No proceeds available");

        proceeds[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit SaleWithdrawn(msg.sender, amount);
    }

    // Get listing details
    function getListing(uint256 tokenId) public view returns (Listing[] memory) {
        return nftListings[tokenId];
    }

    // Get trade history
    function getTradeHistory() public view returns (Trade[] memory) {
        return tradeHistory;
    }

    // Required for ERC1155Receiver
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }
}
