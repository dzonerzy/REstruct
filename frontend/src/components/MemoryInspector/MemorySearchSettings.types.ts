export enum FirstScanType {
  ExactValue,
  BiggerThan,
  SmallerThan,
  ValueBetween,
  UnknownInitialValue,
}

export enum NextScanType {
  ExactValue = 5,
  BiggerThan,
  SmallerThan,
  ValueBetween,
  IncreasedValue,
  IncreasedValueBy,
  DecreasedValue,
  DecreasedValueBy,
  ChangedValue,
  UnchangedValue,
  IgnoreValue,
}

export enum ValueType {
  Binary,
  Byte,
  TwoBytes,
  FourBytes,
  EightBytes,
  Float,
  Double,
  String,
  ArrayOfByte,
  All,
  UnknownInitialValue,
}
