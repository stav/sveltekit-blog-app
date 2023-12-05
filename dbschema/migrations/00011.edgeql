CREATE MIGRATION m1vqzsgxm7wjqslrrlg2ikmsxmatcvxabykhxplfn6b75jgjjj3jxa
    ONTO m16j2zdn25yfvcbfyamgc2gh2lhl7xgynptqsfegkox4i6wdu23tlq
{
  ALTER TYPE default::Client {
      CREATE LINK user: default::User;
  };
};
