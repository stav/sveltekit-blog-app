// GENERATED by @edgedb/generate v0.4.1

import { ExpressionKind } from "edgedb/dist/reflection/index.js";
import { $expressionify } from "./path.mjs";
export function detached(expr) {
    return $expressionify({
        __element__: expr.__element__,
        __cardinality__: expr.__cardinality__,
        __expr__: expr,
        __kind__: ExpressionKind.Detached,
    });
}
