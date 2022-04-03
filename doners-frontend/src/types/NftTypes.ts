export type NftMetadataType = {
  attributes: Array<NftAttributesType>;
  compiler: string;
  date: number;
  description: string;
  dna: string;
  edition: string;
  external_url: string;
  image: string;
  name: string;
  tokenId: number;
};

type NftAttributesType = {
  trait_type: string;
  value: string;
};
