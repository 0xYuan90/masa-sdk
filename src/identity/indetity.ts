import { PaymentMethod } from "../contracts";
import { createIdentity } from "./create";
import { loadIdentity } from "./load";
import { burnIdentity } from "./burn";
import { showIdentity } from "./show";
import Masa from "../masa";

export const identity = (masa: Masa) => ({
  create: (soulName: string, duration: number, paymentMethod: PaymentMethod) =>
    createIdentity(masa, soulName, duration, paymentMethod),
  load: (address?: string) => loadIdentity(masa, address),
  burn: () => burnIdentity(masa),
  show: (address?: string) => showIdentity(masa, address),
});