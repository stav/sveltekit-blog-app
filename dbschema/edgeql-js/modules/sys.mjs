// GENERATED by @edgedb/generate v0.4.1

import * as $ from "../reflection.mjs";
import * as _ from "../imports.mjs";
const TransactionIsolation = $.makeType(_.spec, "070715f3-0100-5580-9473-696f961243eb", _.syntax.literal);

const VersionStage = $.makeType(_.spec, "16a08f13-b1b1-57f4-8e82-062f67fb2a4c", _.syntax.literal);

const $SystemObject = $.makeType(_.spec, "43f8d5e9-5b2e-535b-a46b-acf8af101718", _.syntax.literal);

const SystemObject= _.syntax.$PathNode($.$toSet($SystemObject, $.Cardinality.Many), null);

const $ExternalObject = $.makeType(_.spec, "e3838826-d523-59f9-86f4-be3cecdf0d4f", _.syntax.literal);

const ExternalObject= _.syntax.$PathNode($.$toSet($ExternalObject, $.Cardinality.Many), null);

const $Database = $.makeType(_.spec, "fd469647-1cf1-5702-85b6-bbdb7e7f1c7e", _.syntax.literal);

const Database= _.syntax.$PathNode($.$toSet($Database, $.Cardinality.Many), null);

const $ExtensionPackage = $.makeType(_.spec, "87787989-1e54-5529-9cc4-524cc873528d", _.syntax.literal);

const ExtensionPackage= _.syntax.$PathNode($.$toSet($ExtensionPackage, $.Cardinality.Many), null);

const $Role = $.makeType(_.spec, "04d3804d-c37f-5969-86b2-a24309653b14", _.syntax.literal);

const Role= _.syntax.$PathNode($.$toSet($Role, $.Cardinality.Many), null);

function get_version(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys::get_version', args, _.spec, [
    {args: [], returnTypeId: "48a4615d-2402-5744-bd11-17015ad18bb9"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_version",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function get_version_as_str(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys::get_version_as_str', args, _.spec, [
    {args: [], returnTypeId: "00000000-0000-0000-0000-000000000101"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_version_as_str",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function get_instance_name(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys::get_instance_name', args, _.spec, [
    {args: [], returnTypeId: "00000000-0000-0000-0000-000000000101"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_instance_name",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function get_transaction_isolation(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys::get_transaction_isolation', args, _.spec, [
    {args: [], returnTypeId: "070715f3-0100-5580-9473-696f961243eb"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_transaction_isolation",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function get_current_database(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys::get_current_database', args, _.spec, [
    {args: [], returnTypeId: "00000000-0000-0000-0000-000000000101"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_current_database",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};



export { TransactionIsolation, VersionStage, $SystemObject, SystemObject, $ExternalObject, ExternalObject, $Database, Database, $ExtensionPackage, ExtensionPackage, $Role, Role };

const __defaultExports = {
  "TransactionIsolation": TransactionIsolation,
  "VersionStage": VersionStage,
  "SystemObject": SystemObject,
  "ExternalObject": ExternalObject,
  "Database": Database,
  "ExtensionPackage": ExtensionPackage,
  "Role": Role,
  "get_version": get_version,
  "get_version_as_str": get_version_as_str,
  "get_instance_name": get_instance_name,
  "get_transaction_isolation": get_transaction_isolation,
  "get_current_database": get_current_database
};
export default __defaultExports;