/**
 * The oxlint AST type names the vendored rules use, as typescript-estree types. Two node kinds
 * oxlint keeps in its AST and typescript-estree drops (`ParenthesizedExpression`,
 * `TSParenthesizedType`) are declared here so upstream's unwrap loops type-check; they never
 * match at runtime.
 */
import type { TSESTree } from "@typescript-eslint/utils";

interface ParenthesizedExpression {
  type: "ParenthesizedExpression";
  expression: Expression;
  loc: TSESTree.SourceLocation;
  parent: Node;
  range: TSESTree.Range;
}
interface TSParenthesizedType {
  type: "TSParenthesizedType";
  typeAnnotation: TSType;
  loc: TSESTree.SourceLocation;
  parent: Node;
  range: TSESTree.Range;
}

export type ArrowFunctionExpression = TSESTree.ArrowFunctionExpression;
export type Expression = ParenthesizedExpression | TSESTree.Expression;
export type Function =
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.TSDeclareFunction
  | TSESTree.TSEmptyBodyFunctionExpression;
export type IdentifierReference = TSESTree.Identifier;
export type Node = ParenthesizedExpression | TSESTree.Node | TSParenthesizedType;
/**
 * typescript-estree types a `RestElement` argument as any destructuring target, member
 * expressions included; one cannot appear in a parameter list and carries no annotation.
 */
export type ParamPattern =
  TSESTree.Parameter | (TSESTree.MemberExpression & { typeAnnotation?: undefined });
export type Program = TSESTree.Program;
export type PropertyKey = TSESTree.PrivateIdentifier | TSESTree.PropertyName;
export type Statement = TSESTree.Statement;
export type TSAsExpression = TSESTree.TSAsExpression;
export type TSCallSignatureDeclaration = TSESTree.TSCallSignatureDeclaration;
export type TSConstructSignatureDeclaration = TSESTree.TSConstructSignatureDeclaration;
export type TSConstructorType = TSESTree.TSConstructorType;
export type TSFunctionType = TSESTree.TSFunctionType;
export type TSInterfaceDeclaration = TSESTree.TSInterfaceDeclaration;
export type TSMethodSignature = TSESTree.TSMethodSignature;
export type TSSignature = TSESTree.TypeElement;
export type TSType = TSESTree.TypeNode | TSParenthesizedType;
export type TSTypeAliasDeclaration = TSESTree.TSTypeAliasDeclaration;
export type TSTypeAnnotation = TSESTree.TSTypeAnnotation;
export type TSTypeAssertion = TSESTree.TSTypeAssertion;
export type TSTypeLiteral = TSESTree.TSTypeLiteral;
export type TSTypeReference = TSESTree.TSTypeReference;
export type VariableDeclarator = TSESTree.VariableDeclarator;
