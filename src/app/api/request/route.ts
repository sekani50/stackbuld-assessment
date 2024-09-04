import path from "path";
import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const jsonDirectory = path.join(process.cwd()); // directory path
      
       // Check and clear cache if it exists
    const categoriesPath = path.join(jsonDirectory, "categories.json");
    const productsPath = path.join(jsonDirectory, "products.json");

    if (require.cache[require.resolve(categoriesPath)]) {
      delete require.cache[require.resolve(categoriesPath)];
    }
    if (require.cache[require.resolve(productsPath)]) {
      delete require.cache[require.resolve(productsPath)];
    }
      // Clear the require cache for the JSON files
      // delete require.cache[
      //   require.resolve(jsonDirectory + "/data/categories.json")
      // ];
      // delete require.cache[
      //   require.resolve(jsonDirectory + "/data/products.json")
      // ];

      // Read the JSON files
      const categoryFileContents = await fs.readFile(
        jsonDirectory + "categories.json",
        "utf8"
      ); // file path
      const productFileContents = await fs.readFile(
        jsonDirectory + "products.json",
        "utf8"
      ); // file path

      const productData = JSON.parse(productFileContents);
      const categoryData = JSON.parse(categoryFileContents);

      const categories = categoryData.map((c: any) => {
        return {
          ...c,
          id: nanoid(),
        };
      });

      const products = productData.map((p: any) => {
        return {
          ...p,

          category: categories.find(
            (c: any) => c.name.toLowerCase() === p.category.toLowerCase()
          ),
          id: nanoid(),
        };
      });

      return NextResponse.json(
        {
          data: { categories, products },
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          error: "An error occurred while making the request.",
        },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
}

export const dynamic = "force-dynamic";
