CREATE MIGRATION m1lihwxszqorkcsd7fbxfb7xap7ru7bntfql6xiq7z4lor3gslfxua
    ONTO m1qlf52vftqwop2cuhwghxjznofbgxp6pqtwplyhn4mixucsx4tdmq
{
  ALTER TYPE default::Client {
      ALTER LINK user {
          RESET OPTIONALITY;
      };
  };
};
