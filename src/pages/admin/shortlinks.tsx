import React, { useState, useEffect } from "react";
import AdminLayout from "@site/src/layouts/Admin";

import "@glideapps/glide-data-grid/dist/index.css";
import DataEditor from "@glideapps/glide-data-grid";

export default function Shortlinks(): JSX.Element {
  const [name, setName] = useState<string>();

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data: string) => setName(data))
      .catch((error) => console.error(`Error fetching name: ${error}`));
  }, []);

  return (
    <AdminLayout>
      <main className="grid lg:grid-cols-4 lg:gap-10 p-6">
        <div className="flex flex-col">
          <div className="rounded-3xl drop-shadow-2xl prose bg-base-100 border-primary border-solid border-2 border-opacity-20 p-6">
            <img src="/svg/logo-color-full.svg" className="mb-2 mt-0" />
            <h2 className="mt-0 dark:text-white">
              Welcome{name ? `, ${name}` : ""}! Ready to shorten some links?
            </h2>
            <form className="form-control space-y-2">
              <input
                type="text"
                placeholder="URL to shorten"
                className="input input-bordered focus:border-primary focus:outline-none"
                required
              />
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Shortcode"
                  className="input input-bordered flex-grow focus:border-primary focus:outline-none"
                />
                <button className="btn btn-outline border-1 border-stone-600 focus:border-opacity-75 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    ></path>
                  </svg>
                </button>
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-outline btn-primary"
              />
            </form>
          </div>
        </div>
        <div className="col-span-3 p-6 rounded-3xl drop-shadow-2xl overflow-auto bg-base-100 border-primary border-solid border-2 border-opacity-20">
          TODO: Table
        </div>
      </main>
    </AdminLayout>
  );
}
