import Table from "../../components/Table/Table";

export default function LocalTypes() {
  const a = 1;
  const b = 2;
  const c = 3;
  return (
    <Table
      data={[
        { "a:c": "asdasdsaasdfasdf", b: b, c: c },
        { a: a, b: b, c: c },
      ]}
    />
  );
}
