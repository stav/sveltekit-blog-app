// GENERATED by @edgedb/generate v0.4.1

import { ExpressionKind, Cardinality, TypeKind, } from "edgedb/dist/reflection/index.js";
import { $expressionify } from "./path.mjs";
import { runnableExpressionKinds } from "./query.mjs";
import { select } from "./select.mjs";
import { complexParamKinds } from "./__spec__.mjs";
export function optional(type) {
    return {
        __kind__: ExpressionKind.OptionalParam,
        __type__: type,
    };
}
export function params(paramsDef, expr) {
    const paramExprs = {};
    for (const [key, param] of Object.entries(paramsDef)) {
        const paramType = param.__kind__ === ExpressionKind.OptionalParam ? param.__type__ : param;
        const isComplex = complexParamKinds.has(paramType.__kind__) ||
            (paramType.__kind__ === TypeKind.array &&
                complexParamKinds.has(paramType.__element__.__kind__));
        paramExprs[key] = $expressionify({
            __kind__: ExpressionKind.Param,
            __element__: paramType,
            __cardinality__: param.__kind__ === ExpressionKind.OptionalParam
                ? Cardinality.AtMostOne
                : Cardinality.One,
            __name__: key,
            __isComplex__: isComplex,
        });
    }
    let returnExpr = expr(paramExprs);
    if (!runnableExpressionKinds.has(returnExpr.__kind__)) {
        returnExpr = select(returnExpr);
    }
    return $expressionify({
        __kind__: ExpressionKind.WithParams,
        __element__: returnExpr.__element__,
        __cardinality__: returnExpr.__cardinality__,
        __expr__: returnExpr,
        __params__: Object.values(paramExprs),
    });
}
