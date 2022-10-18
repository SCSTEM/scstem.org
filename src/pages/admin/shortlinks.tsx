import React, { useState, useEffect } from "react";
import AdminLayout from "@site/src/layouts/Admin";

import "@glideapps/glide-data-grid/dist/index.css";
import {
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";

export default function Shortlinks(): JSX.Element {
  const [name, setName] = useState<string>();

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data: string) => setName(data))
      .catch(() => console.error("Error fetching name"));
  }, []);

  const gridColumns: GridColumn[] = [
    { title: "Code", width: 100 },
    { title: "URL", width: 300 },
    { title: "Clicks", width: 50 },
  ];

  const getData = ([col, row]: Item): GridCell => {
    switch (col) {
      case 0:
        return {
          kind: GridCellKind.Text,
          data: "abc123",
          allowOverlay: false,
          displayData: "abc123",
        };
      case 1:
        return {
          kind: GridCellKind.Uri,
          data: "https://example.com",
          allowOverlay: false,
        };
      case 2:
        return {
          kind: GridCellKind.Number,
          data: 3,
          allowOverlay: false,
          displayData: "Three",
        };
    }
  };

  return (
    <AdminLayout>
      <main className="grid p-6 lg:grid-cols-4 lg:gap-10">
        <div className="flex flex-col">
          <div className="rounded-3xl border-2 border-solid border-primary border-opacity-20 bg-base-100 p-6 drop-shadow-xl">
            <img src="/svg/logo-color-full.svg" className="mb-2 mt-0" />
            <h2 className="mt-0 dark:text-white">
              Welcome{name ? `, ${name}` : ""}! Ready to shorten some links?
            </h2>
            <form className="form-control space-y-2">
              <input
                type="text"
                placeholder="URL to shorten"
                className="input input-bordered input-primary focus:outline-none"
                required
              />
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Shortcode"
                  className="input input-bordered input-primary flex-grow focus:outline-none"
                />
                <button
                  className="btn btn-primary border-stone-600 focus:border-opacity-75 focus:outline-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    ></path>
                  </svg>
                </button>
              </div>
              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
          </div>
        </div>
        <div className="col-span-3 overflow-auto rounded-3xl border-2 border-solid border-primary border-opacity-20 bg-base-100 p-6 drop-shadow-xl">
          Will add the grid ...eventually.
        </div>
      </main>
    </AdminLayout>
  );
}
