// interface
import { AbiItem } from 'web3-utils';

export const FundraiserFactoryABI: AbiItem | AbiItem[] = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract Fundraiser',
        name: 'fundraiser',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'FundraiserCreated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'fundraisersCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'url',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'imageURL',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'address payable',
        name: 'beneficiary',
        type: 'address',
      },
    ],
    name: 'createFundraiser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
    ],
    name: 'fundraisers',
    outputs: [
      {
        internalType: 'contract Fundraiser[]',
        name: 'coll',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];
