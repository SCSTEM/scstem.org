/**
 * The `@oxlint/plugins` surface the vendored rules import, provided by ESLint.
 *
 * `defineRule` turns an oxlint-shaped rule (`meta` + `createOnce`) into an ESLint rule module
 * whose `create` delegates to `createOnce`. `ESTree` maps the oxlint AST type names the rules use
 * onto typescript-estree's (see `estree.ts`).
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import type { Rule } from "eslint";

import type * as ESTree from "./estree.ts";

export type * as ESTree from "./estree.ts";

type JsonValue = { [key: string]: JsonValue } | JsonValue[] | string | number | boolean | null;

type Options = JsonValue[];

export type Scope = TSESLint.Scope.Scope;
export type Variable = TSESLint.Scope.Variable;

/**
 * The SourceCode surface the rules use, typed as oxlint does: `isGlobalReference` exists at
 * runtime since ESLint 9 but not in typescript-eslint's typings, and the scope manager is never
 * null once a file is parsed.
 */
export interface SourceCode {
  getCommentsBefore(node: ESTree.Node): TSESTree.Comment[];
  getScope(node: ESTree.Node): Scope;
  getText(node?: ESTree.Node): string;
  isGlobalReference(node: TSESTree.Identifier): boolean;
  readonly scopeManager: TSESLint.Scope.ScopeManager;
  readonly text: string;
  readonly visitorKeys: TSESLint.SourceCode.VisitorKeys;
}

/** The rule context surface the rules use. */
interface Context<MessageIds extends string> {
  readonly options: Options;
  report(descriptor: {
    node: ESTree.Node;
    messageId: MessageIds;
    data?: Record<string, string>;
  }): void;
  readonly sourceCode: SourceCode;
}

type RuleMeta<MessageIds extends string> = Omit<
  TSESLint.RuleMetaData<MessageIds, unknown, Options>,
  "schema"
> & { schema?: TSESLint.RuleMetaData<MessageIds, unknown, Options>["schema"] };

interface OxlintRule<MessageIds extends string> {
  meta: RuleMeta<MessageIds>;
  createOnce: (context: Context<MessageIds>) => TSESLint.RuleListener;
}

export function defineRule<MessageIds extends string>(
  rule: OxlintRule<MessageIds>,
): Rule.RuleModule {
  // SAFETY: ESLint builds the context and consumes the listener; `Context` and
  // `TSESLint.RuleListener` are typescript-eslint's names for those same runtime objects (the
  // runtime SourceCode has the `isGlobalReference` and `scopeManager` that `Context` names).
  // The scope classes of the two type packages share no structure, so the bridge is a chained
  // assertion.
  // eslint-disable-next-line anti-slop/no-chained-type-assertions -- see SAFETY above
  const create = rule.createOnce as unknown as Rule.RuleModule["create"];
  return { meta: { ...rule.meta, schema: rule.meta.schema ?? [] }, create };
}
