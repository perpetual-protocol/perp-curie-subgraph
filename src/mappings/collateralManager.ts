import { CollateralAdded as CollateralAddedEvent } from "../../generated/CollateralManager/CollateralManager"
import { Token } from "../../generated/schema"
import { fetchTokenDecimals, fetchTokenName, fetchTokenSymbol } from "../utils/token"

export function handleCollateralAdded(event: CollateralAddedEvent): void {
    const tokenAddr = event.params.token
    const token = new Token(tokenAddr.toHexString())
    token.name = fetchTokenName(tokenAddr)
    token.symbol = fetchTokenSymbol(tokenAddr)
    token.decimals = fetchTokenDecimals(tokenAddr)
    token.save()
}
