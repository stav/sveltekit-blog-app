CREATE MIGRATION m16j2zdn25yfvcbfyamgc2gh2lhl7xgynptqsfegkox4i6wdu23tlq
    ONTO m1i6pljxuavtukjvj7s4uhbczbyezvrrchlzvtz7y2qrpu3p4cxaia
{
      ALTER TYPE default::Job {
      ALTER PROPERTY total_cost {
          USING (std::sum(std::to_decimal(.costs.amount)));
      };
      ALTER PROPERTY total_earn {
          USING (std::sum(std::to_decimal(.payments.amount)));
      };
  };
};
