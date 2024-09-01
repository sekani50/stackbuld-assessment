import path from "path";
import {promises as fs} from "fs";
import { nanoid } from "nanoid";

import { NextRequest, NextResponse } from "next/server";

      export async function GET(
        req: NextRequest) {
      
      
        if (req.method === "GET") {
          try {
    
            const jsonDirectory = path.join(process.cwd(), 'public');
            const fileContents = await fs.readFile(jsonDirectory + '/data/categories.json', 'utf8');
            const data = JSON.parse(fileContents);
          
             const categories = data.map((c: any) => {
                return {
                 ...c,
                  id: nanoid(),
                };
            
             })   

            return NextResponse.json(
              {
                data: {categories, products:[]},
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
      