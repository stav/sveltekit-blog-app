CREATE MIGRATION m1qlf52vftqwop2cuhwghxjznofbgxp6pqtwplyhn4mixucsx4tdmq
    ONTO m1vqzsgxm7wjqslrrlg2ikmsxmatcvxabykhxplfn6b75jgjjj3jxa
{
  ALTER TYPE default::Client {
      ALTER LINK user {
          SET REQUIRED USING (<default::User>{});
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK clients := (.<user[IS default::Client]);
  };
};
