// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";

//https://github.com/HashLips/nft_ipfs_minter/blob/main/contracts/SmartContract.sol
// 이 contract는 doners-nft-engine에서 web3.js를 사용해서 별도로 call()해서 접근할 예정.
// doners-frontend는 이 contract에는 "직접적으로는" 접근할 일이 없다.
//* NFT generator 역할 */
contract DonersDoughnutsFactory is ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;

    // ERC721.sol의 생성자를 호출
    // constructor(string memory tokenName, string memory symbol)
    constructor() ERC721("DonersDougnuts", "DD") {}

    Counters.Counter private _index;

    // TODO 필요없으므로 삭제? createDougnut()의 2번쨰 줄도 같이 삭제해야함 삭제한다면.
    // mapping(uint256 => string) private _tokenURIs;
    // 아래로 (mapping -> struct 배열)로 대체?
    // DDToken[] public ddTokens = new DDToken[](5000000);
    // DDToken[5000000] public ddTokens;

    // tokenId to metadataUrl
    // mapping(uint256 => string) public tokenURIs;
    mapping(uint256 => string) private _tokenURIs;

    // 하나의 DD에 대한 stuct
    struct DDToken {
        uint256 tokenId;
        string metadataUri;
    }

    function mint(string memory _uri) public payable {
        uint256 mintIndex = totalSupply();
        _safeMint(msg.sender, mintIndex);
        _setTokenURI(mintIndex, _uri);
    }

    function createToken(string memory _uri) public returns (uint256) {
        _index.increment();
        uint256 newItemId = _index.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _uri);

        return newItemId;
    }

    /* NFT 생성 */
    // doners-nft-engine에서 생성한 _ipfsMetas.json 파일들 4개로 NFT를 생성해
    // 이 'DonersDoughnutsFactory' Contract에 저장해둔다.
    function createDoughnut(uint256 tokenId, string memory _metadataUri)
        public
        payable
        returns (uint256)
    {
        // (해결) "Operation push has changed behavior since since solidity 0.6. It no longer returns the length but a reference to the added element."
        // uint256 id = _ddTokens.push(DDToken(tokenIds.current(), _metadataUri));
        // ddTokens[tokenId] = DDToken(tokenId, _metadataUri));

        _setTokenURI(tokenId, _metadataUri);
        _safeMint(msg.sender, tokenId);

        // ddTokens[tokenId] = _metadataUri;
        _index.increment();
        return _index.current();
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        override
    {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(_exists(tokenId));
        // string memory _tokenURI = _tokenURIs[tokenId];
        return tokenURI(tokenId);
    }

    function getTotalCnt() public view returns (uint256) {
        return _index.current();
    }

    // get metadata uri ("ipfs://"로 시작하는)
    function getMetadataUri(uint256 tokenId)
        external
        view
        returns (string memory)
    {
        require(_exists(tokenId));
        return _tokenURIs[tokenId];
    }

    // =========================== ERC721URIStorage 관련

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // // owner === to
    // function mintToken(address owner, string memory metadataURI)
    //     public
    //     returns (uint256)
    // {
    //     uint256 tokenId = tokenIds.current();
    //     _safeMint(owner, tokenId);
    //     _setTokenURI(tokenId, metadataURI);
    //     _tokenIds.increment();

    //     return tokenId;
    // }

    // // 해당 account의 NFT 목록
    // function getTokenList(address owner)
    //     public
    //     view
    //     returns (RenderToken[] memory)
    // {
    //     uint256 totalCnt = _tokenIds.current();
    //     uint256 tokenId = 0;

    //     RenderToken[] memory list;
    //     for (uint256 i = 0; i < totalCnt; i++) {
    //         // mint가 된 NFT && NFT의 owner가 해당 owner인지
    //         if (_exists(tokenId) && ownerOf(tokenId)) {
    //             string memory metadataUri = tokenURI(tokenId);
    //             list.push(RenderToken(tokenId, metadataUri));
    //         }
    //         tokenId++;
    //     }
    //     return list;
    // }

    // // 전체 NFT 목록
    // function getAllTokens() public view returns (RenderToken[] memory) {
    //     uint256 totalCnt = _tokenIds.current();
    //     uint256 counter = 0;

    //     RenderToken[] memory res = new RenderToken[](totalCnt);
    //     for (uint256 i = 0; i < totalCnt; i++) {
    //         if (_exists(counter)) {
    //             string memory uri = tokenURI(counter);
    //             res[counter] = RenderToken(counter, uri);
    //         }
    //         counter++;
    //     }
    //     return res;
    // }

    // // 총 minting된 NFT 개수
    // // (_tokenIds 를 public하게 선언하면 getter가 자동으로 지원되기 때문에 필요없는 함수이긴 함.)
    // function getTokenCount() {}
}
