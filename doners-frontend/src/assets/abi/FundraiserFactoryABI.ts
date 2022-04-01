// interface
import { AbiItem } from 'web3-utils';

export const FundraiserFactoryABI: AbiItem | AbiItem[] = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
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
        name: 'title',
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
        internalType: 'uint256',
        name: 'donationsGoal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fundRaisingCloses',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: 'beneficiary',
        type: 'address',
      },
    ],
    name: 'createFundraiser',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFundraisers',
    outputs: [
      {
        internalType: 'address[]',
        name: 'coll',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];
