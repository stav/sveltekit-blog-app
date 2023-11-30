module default {

  type Post extending HasTimestamp {
    required property title -> str;
    required property slug -> str { constraint exclusive; };
    required property content -> str;
    property snippet -> str;
    required link author -> User;
    property image_src -> str;
    multi link tags -> Tag;
    multi link comments := .<post[is Comment]
  }

  type Comment extending HasTimestamp {
    required property content -> str;
    required link author -> User;
    required link post -> Post;
  }

  type Tag {
    required property name -> str { constraint exclusive; }
  }

  type User extending HasTimestamp {
    required property email -> str { constraint exclusive; };
    required property username -> str { constraint exclusive; };
    property first_name -> str;
    property last_name -> str;
    property password_hash -> str;
    property user_auth_token -> str { constraint exclusive; };
    property avatar_src -> str;
    property full_name := .first_name ++ ' ' ++ .last_name;
    property role -> Role {
      default := 'user';
    }
  }

  type Client extending HasTimestamp {
    property email -> str;
    property phone -> str;
    property company_name -> str;
    property first_name -> str;
    property last_name -> str;
    property full_name := .first_name ++ ' ' ++ .last_name;
    property street -> str;
    property city -> str;
    property state -> str;
    property zip -> str;
    property address := .street ++ ', ' ++ .city ++ ', ' ++ .state ++ ' ' ++ .zip;
    multi link jobs := .<client[is Job];
    property status -> Status {
      default := 'active';
    }
  }

  type Job extending HasTimestamp {
    required link client -> Client;
    multi link tags -> Tag;
    multi link costs := .<job[is Cost];
    multi link payments := .<job[is Payment];
    property total_cost := sum(to_decimal(.costs.amount));
    property total_earn := sum(to_decimal(.payments.amount));
    property beg_date -> str;
    property end_date -> str;
    property title -> str;
  }

  type Cost extending HasTimestamp {
    required link job -> Job;
    multi link tags -> Tag;
    property description -> str;
    property purchase_date -> str;
    property job_date -> str;
    property vendor -> str;
    property amount -> str;
    property tax -> str;
  }

  type Payment extending HasTimestamp {
    required link job -> Job;
    multi link tags -> Tag;
    property description -> str;
    property amount -> str;
    property date -> str;
  }

  abstract type HasTimestamp {
    required property created_at -> datetime {
      default := (datetime_current());
    }
  }

  scalar type Role extending enum <"admin", "user">;
  scalar type Status extending enum <"active", "archived">;
}
