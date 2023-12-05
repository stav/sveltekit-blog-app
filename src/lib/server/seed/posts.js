// @ts-nocheck
import { Post, Tag, User } from "$lib/server/database.js"
import { selectTagId, selectUserId } from "./db"

// We assume the tags & users already exist
export async function addPosts() {

  console.info('Adding posts...')

  const sveltekit_tag_id = await selectTagId("SvelteKit")
  const tailwind_tag_id = await selectTagId("Tailwind")
  const database_tag_id = await selectTagId("Database")
  const edgedb_tag_id = await selectTagId("EdgeDB")

  await addPost({
    title: "How Tailwind's Utility-First Design Improves CSS Development",
    slug: "how-tailwind's-utility-first-design-improves-css-development",
    content:
      "<p>Tailwind CSS is a popular CSS framework that provides a utility-first approach to CSS development, which offers many benefits for web developers. In this article, we will explore five approaches to CSS development and how Tailwind uses the fifth approach to help developers create visually appealing websites quickly and efficiently.</p><p><br></p><h2>Approach 1: Separation of Concerns</h2><p>The first approach to CSS development involves separating content and styling decisions. While this approach is effective, there is a risk of coupling between CSS and HTML, and it can lead to selector specificity issues. CSS Zen Garden is an example of this approach, where the same HTML markup could have 100s of different designs based on style sheets contributed by various graphic designers.</p><p><br></p><h2>Approach 2: Decoupling Styles from Structure</h2><p>The second approach to CSS development addresses the issues raised in approach 1. However, it can be challenging to deal with similar components, and the separation of concerns approach to HTML and CSS can be too black and white. The BEM CSS methodology is an example of this approach.</p><p><br></p><h2>Approach 3: Creating Content-Agnostic CSS Components</h2><p>In approach 3, developers aim to create content-agnostic CSS components that can be reused across various content types. However, the more specific and complex a component is, the harder it is to reuse. Bootstrap is an example of this approach.</p><p><br></p><h2>Approach 4: Creating Content-Agnostic Components and Utility Classes</h2><p>In approach 4, developers create content-agnostic components and utility classes. However, creating a new component modifier for a single CSS property is unnecessary and not semantically meaningful.</p><p><br></p><h2>Approach 5: Designing with a Utility-First Approach</h2><p>The final approach of CSS development is designing with a utility-first approach. This approach uses CSS utility classes to create a more flexible and reusable design system. Tailwind CSS is an excellent example of a utility-first CSS framework. Tailwind provides a wide range of pre-defined classes for frequently used styles, such as colors, typography, spacing, and layout, which developers can use to create new designs quickly and easily. By using utility classes, developers can avoid writing custom CSS for every new design, leading to faster development times, fewer errors, and more consistent designs.</p><p><br></p><p>In conclusion, CSS development has evolved over time, and developers can now choose from many approaches. The utility-first approach provided by Tailwind CSS can make designing and developing websites more efficient and effective, allowing developers to focus on creating visually appealing websites that meet their customers' needs. By using Tailwind CSS, developers can save time and energy, reduce errors, and create more consistent designs.</p>",
    snippet:
      "Tailwind CSS is a popular CSS framework that provides a utility-first approach to CSS development, which offers many benefits for web developers. In this article, we will explore five approaches to CSS development and how Tailwind uses the fifth approach to help developers create visually appealing websites quickly and efficiently.",
    image_src: "/images/desk1.avif",
    tags: [tailwind_tag_id],
    author: await selectUserId("victor"),
  })

  await addPost({
    title: "SvelteKit Simplifies Web App Development",
    slug: "sveltekit-simplifies-web-app-development",
    content:
      "<p>SvelteKit is a web framework built on top of the Svelte compiler that makes it easy to build fast, dynamic, and reactive web applications. It is an open-source project that provides developers with a set of tools and best practices for building server-side rendered web applications. SvelteKit is designed to be easy to use and easy to learn, making it an ideal choice for both experienced and novice developers.</p><p><br></p><p>One of the key features of SvelteKit is its built-in server-side rendering capabilities. This allows web pages to be pre-rendered on the server before being sent to the customer, resulting in faster load times and better search engine optimization (SEO). However unlike many other frameworks, after the initial server-side render subsequent page navigations default to customer side navigation keeping performance snappy.</p><p><br></p><p>SvelteKit provides a number of other useful features, including automatic code splitting and lazy loading of components. This helps to minimize the amount of code that needs to be downloaded by the customer, further improving load times. Additionally, SvelteKit supports hot module replacement, which allows developers to make changes to their code and see the results in real-time without needing to reload the page.</p><p><br></p><p>In summary, SvelteKit is a powerful and flexible web framework that provides developers with a modern and efficient way to build web applications. Its server-side rendering capabilities, code splitting, lazy loading, and hot module replacement make it a great choice for building fast and dynamic applications that can be optimized for both the customer and the server. With its ease of use and strong community support, SvelteKit is a great option for developers looking to build scalable and performant web applications.</p>",
    snippet:
      "SvelteKit is a web framework built on top of the Svelte compiler that makes it easy to build fast, dynamic, and reactive web applications. It is an open-source project that provides developers with a set of tools and best practices for building server-side rendered web applications.",
    image_src: "/images/desk2.avif",
    tags: [sveltekit_tag_id],
    author: await selectUserId("zander"),
  })

  await addPost({
    title: "The Rise of EdgeDB: A New Era in Database Technology",
    slug: "the-rise-of-edgedb-a-new-era-in-database-technology",
    content:
      '<p>EdgeDB is a graph-relational database that has been under development for over a decade. The journey began in 2008 when Yury and Elvis, the co-founders of MagicStack, started incubating homegrown tools to address the problems they encountered on every project. One of these tools was Caos, a "super ORM" that evolved with each customer project and featured a YAML-like, object-oriented schema definition language, support for schema composition, indexes, constraints, and a query language called CaosQL. Caos already had some of EdgeDB\'s big ideas, such as links, schema mixins, easy deep querying, and introspectability.</p><p><br></p><p>In 2014, the co-founders launched BoatBee, an endeavor that proved to be a post-mortem learning experience. It prompted them to look critically at their stack of tools and recognize that while the state of tooling for web development had progressed, the database layer had not. They saw an opportunity to evolve Caos into a new type of database, yet numerous obstacles needed to be overcome.</p><p><br></p><p>The journey to the first stable version of EdgeDB took longer than anticipated, but along the way, the co-founders spun out two major open-source projects, helped introduce async/await into the Python language, and grew to a 10-person open-source company. On February 10th, 2023, EdgeDB released its first stable version after 2100 PRs, 4600 integration tests, and 14 pre-releases. Just six months later, EdgeDB 2.0 was released, adding many new features, including a built-in admin UI and object-level security. On November 7, 2022, EdgeDB announced it had raised a $15 million Series A financing round led by Nava Ventures and Accel.</p><p><br></p><h2>Can we do better than SQL?</h2><p><br></p><p>The relational model was introduced by Edgar F. Codd in a 1970 paper where he proposed that data in a database could be represented as sets of tuples called relations.&nbsp;He also created a form of first-order predicate logic for describing database queries: tuple relation calculus. In 1974, Donald Chamberlin and Raymond Boyce published a paper introducing SQL as a simplified alternative to the formal relational query languages.</p><p><br></p><p>Many experts, including Codd himself, heavily criticized SQL.&nbsp;It lacks compactness, consistency, and cohesion, making it hard to compose, write, and comprehend queries. SQL is not a small language and contains 469 keywords, and just part 2 (out of 14) of the SQL:2016 standard has 1732 pages.&nbsp;This complexity contributes negatively to the ability to write and comprehend SQL queries.</p><p><br></p><p>EdgeDB was built from the ground up to solve the foundational problems of SQL and is guided by principles of ergonomics, performance, and correctness. The data model, EdgeQL, and all aspects of EdgeDB are designed to be straightforward to reason about and satisfying to use. EdgeQL features, language bindings, and tooling are also designed for high performance and low latency. While usability and performance are important, correctness is never sacrificed in favor of ergonomics or performance, and nonsensical operations must always generate an error.</p><p><br></p><p>In conclusion, EdgeDB represents a groundbreaking approach to databases, addressing the foundational problems of SQL and providing a more usable, higher-performing database.&nbsp;After over a decade of persistent efforts from its co-founders, the vision of EdgeDB has become reality in a stable and feature-rich database. This development, coupled with its recent successful Series A financing round, position EdgeDB to revolutionize the database industry and improve the lives of developers worldwide.</p>',
    snippet:
      "EdgeDB is a graph-relational database that has been under development for over a decade. The journey began in 2008 when Yury and Elvis, the co-founders of MagicStack, started incubating homegrown tools to address the problems they encountered on every project.",
    image_src: "/images/desk3.avif",
    tags: [edgedb_tag_id, database_tag_id],
    author: await selectUserId("siri"),
  })

  console.info('added posts.')
}

/**
 * @param {Post} post
 * @returns void
 */
async function addPost(post) {
  const result = await Post.insert_in_readonly_mode({
    title: post.title,
    slug: post.slug,
    content: post.content,
    snippet: post.snippet,
    image_src: post.image_src,
    author: User.select_query({
      filter_single: { id: post.author },
    }),
    tags: Tag.select_query_by_ids(post.tags),
  })
  console.info("Added post: " + post.title, result.id)
}
