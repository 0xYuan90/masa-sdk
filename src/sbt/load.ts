import {
  MasaSBT,
  MasaSBTAuthority,
  MasaSBTSelfSovereign,
} from "@masa-finance/masa-contracts-identity";
import { BigNumber } from "ethers";
import Masa from "../masa";
import { patchMetadataUrl } from "../helpers";
import { isBigNumber } from "../utils";

export const loadSBTIDs = async (
  masa: Masa,
  contract: MasaSBTSelfSovereign | MasaSBTAuthority | MasaSBT,
  sbtIDs: BigNumber[]
) => {
  return await Promise.all(
    sbtIDs.map(async (tokenId: BigNumber) => {
      const tokenUri = patchMetadataUrl(masa, await contract.tokenURI(tokenId));

      return {
        tokenId,
        tokenUri,
      };
    })
  );
};

export const loadSBTs = async (
  masa: Masa,
  contract: MasaSBTSelfSovereign | MasaSBTAuthority | MasaSBT,
  identityIdOrAddress: BigNumber | string
): Promise<
  {
    tokenId: BigNumber;
    tokenUri: string;
  }[]
> => {
  let SBTIDs: BigNumber[] = [];

  try {
    // do we have a soul linker here? use it!
    if (masa.contracts.instances.SoulLinkerContract.hasAddress) {
      const {
        "getSBTConnections(address,address)": getSBTConnectionsByAddress,
        "getSBTConnections(uint256,address)": getSBTConnectionsByIdentity,
      } = masa.contracts.instances.SoulLinkerContract;

      SBTIDs = await (isBigNumber(identityIdOrAddress)
        ? getSBTConnectionsByIdentity(identityIdOrAddress, contract.address)
        : getSBTConnectionsByAddress(identityIdOrAddress, contract.address));
    } else if (!isBigNumber(identityIdOrAddress)) {
      const balance: number = (
        await contract.balanceOf(identityIdOrAddress)
      ).toNumber();

      if (balance > 0) {
        for (let i = 0; i < balance; i++) {
          SBTIDs.push(
            await contract.tokenOfOwnerByIndex(identityIdOrAddress, i)
          );
        }
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Loading SBTs failed! ${error.message}`);
    }
  }

  return await loadSBTIDs(masa, contract, SBTIDs);
};
