// GENERATED by @edgedb/generate v0.4.1

import { ExpressionKind, } from "edgedb/dist/reflection/index.js";
import { $expressionify, $getScopedExpr, $assert_single } from "./path.mjs";
import { $existingScopes, $handleModifiers, } from "./select.mjs";
import { $normaliseInsertShape } from "./insert.mjs";
export function update(expr, shape) {
    const cleanScopedExprs = $existingScopes.size === 0;
    const scope = $getScopedExpr(expr, $existingScopes);
    const resolvedShape = shape(scope);
    if (cleanScopedExprs) {
        $existingScopes.clear();
    }
    const mods = {};
    let updateShape;
    for (const [key, val] of Object.entries(resolvedShape)) {
        if (key === "filter" || key === "filter_single") {
            mods[key] = val;
        }
        else if (key === "set") {
            updateShape = val;
        }
        else {
            throw new Error(`Invalid update shape key '${key}', only 'filter', 'filter_single', ` +
                `and 'set' are allowed`);
        }
    }
    if (!updateShape) {
        throw new Error(`Update shape must contain 'set' shape`);
    }
    const { modifiers, cardinality, needsAssertSingle } = $handleModifiers(mods, {
        root: expr,
        scope,
    });
    const updateExpr = {
        __kind__: ExpressionKind.Update,
        __element__: expr.__element__,
        __cardinality__: cardinality,
        __expr__: expr,
        __shape__: $normaliseInsertShape(expr, updateShape, true),
        __modifiers__: modifiers,
        __scope__: scope,
    };
    return needsAssertSingle
        ? $assert_single(updateExpr)
        : $expressionify(updateExpr);
}
