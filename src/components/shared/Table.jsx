import { Button } from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import TableActionBtn from "../shared/TableActionBtn";
import MakeAdminBtn from "../others/admin/allUsers/MakeAdminBtn";

export default function BasicTable({ rerender, data, columns, type }) {
  // console.log(data)
  const [sorting, setSorting] = useState([]);
  //   const [filtering, setFiltering] = useState("");

  // check if the text is img url
  const isImageUrl = (cell) => {
    const value = cell.getValue();

    if (Array.isArray(value)) {
      if (typeof value[0] !== typeof "string") {
        return false;
      }

      if (value[0]?.startsWith("http") || value[0]?.startsWith("https")) {
        //   console.log(result);
        return true;
      }
    } else if (typeof value === typeof "string") {
      if (value?.startsWith("http") || value?.startsWith("https")) {
        //   console.log(result);
        return true;
      }
    }
    return false;
  };

  const setImage = (cell) => {
    const value = cell.getValue();
    if (Array.isArray(value)) {
      return value[0];
    } else {
      return value;
    }
  };

  //   display text based on object or normal text
  const displayData = (cell, orginalData) => {
    const result = cell.getValue();

    // this is for pet adopted status for Mypets component

    if (result?.constructor?.name === "Object") {
      // console.log(result)
      if (result?.status == false) {
        return "Not adopted";
      } else if (result?.status == true) {
        return "Adopted";
      }
    } else if (Array.isArray(result)) {
      // this is for progess bar for DonationCampaigns component
      const sum = result
        .map((data) => data.amount)
        .reduce((accumulator, currentNumber) => accumulator + currentNumber, 0);
      const percentage = (sum / orginalData?.maximumDonationAmount) * 100;
      return (
        <>
          <div className="flex justify-center items-center">
            <progress
              value={sum}
              max={orginalData.maximumDonationAmount}
              className="h-[1rem]"
            />
            <p className="ml-1">{percentage}%</p>
          </div>
        </>
      );
      // console.log(orginalData.maximumDonationAmount)
    } else {
      return result;
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      //   globalFilter: filtering,
    },
    onSortingChange: setSorting,
  });

  const petsFuncButtons = [
    {
      name: "Update",
      bg: "",
    },
    {
      name: "Delete",
      bg: "red",
    },
    {
      name: "Adopted",
      bg: "green",
    },
  ];

  const donationCampaignsBtn = [
    {
      name: "Pause",
      bg: "red",
    },
    {
      name: "Unpaused",
      bg: "green",
    },
    {
      name: "Edit",
      bg: "",
    },

    // {
    //   name: "View Donators",
    //   bg: "#fe5629",
    // },
  ];

  return (
    <div className="w3-container h-screen  overflow-scroll mt-4">
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            const orginalData = row.original;
            // console.log(orginalData)
            // row.getVisibleCells().map(c=>console.log())
            return (
              <>
                <tr key={row.id}>
                  {/* actual data */}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {
                          // If the cell value is a URL, render an img tag
                          isImageUrl(cell) ? (
                            <img
                              src={setImage(cell)}
                              alt="image"
                              className="w-[50px] h-[50px]"
                            />
                          ) : (
                            displayData(cell, orginalData)
                          )
                        }
                      </td>
                    );
                  })}

                  {/* generate button */}

                  {/* for my pets dashboard */}
                  {type === "my pets" &&
                    petsFuncButtons.map((_data, index) => (
                      <td key={index}>
                        <TableActionBtn
                          data={orginalData}
                          rerender={rerender}
                          bg={_data.bg}
                          name={_data.name}
                        />
                      </td>
                    ))}

                  {/* this is for admin dashboard */}
                  {type === "all pets" &&
                    petsFuncButtons.map((_data, index) => (
                      <td key={index}>
                        <TableActionBtn
                          data={orginalData}
                          rerender={rerender}
                          bg={_data.bg}
                          name={_data.name}
                        />
                      </td>
                    ))}

                  {/* this is for admin dashboard */}
                  {type === "all pets" && (
                    <td>
                      <TableActionBtn
                        data={orginalData}
                        rerender={rerender}
                        bg={"green"}
                        name={"remove adoption"}
                      />
                    </td>
                  )}

                  {/* for req pets dashboard */}
                  {type === "req pets" && (
                    <td>
                      <TableActionBtn
                        data={orginalData}
                        rerender={rerender}
                        bg={"green"}
                        name={"Accept"}
                      />
                    </td>
                  )}

                  {/* for req pets dashboard */}
                  {type === "req pets" && (
                    <td>
                      <TableActionBtn
                        data={orginalData}
                        rerender={rerender}
                        bg={"red"}
                        name={"Reject"}
                      />
                    </td>
                  )}

                  {type === "donations campaings" &&
                    donationCampaignsBtn.map((_data, index) => (
                      <td key={index}>
                        <TableActionBtn
                          data={orginalData}
                          rerender={rerender}
                          bg={_data.bg}
                          name={_data.name}
                        />
                      </td>
                    ))}

                  {/* this is for admin dahsboard */}
                  {type === "donations campaings all" &&
                    donationCampaignsBtn.map((_data, index) => (
                      <td key={index}>
                        <TableActionBtn
                          data={orginalData}
                          rerender={rerender}
                          bg={_data.bg}
                          name={_data.name}
                        />
                      </td>
                    ))}

                  {/* this is for admin dashboard */}
                  {type === "donations campaings all" && (
                    <td>
                      <TableActionBtn
                        data={orginalData}
                        rerender={rerender}
                        bg={"red"}
                        name={"Delete Donation"}
                      />
                    </td>
                  )}

                  {type === "my donations" && (
                    <td>
                      <TableActionBtn
                        data={orginalData}
                        rerender={rerender}
                        bg={""}
                        name={"Refund"}
                      />
                    </td>
                  )}

                  {type === "usersFromAdmin" && (
                    <MakeAdminBtn rerender={rerender} userData={orginalData} />
                  )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      {/* button section */}

      <div className="w-full flex justify-center items-center mt-4 gap-3">
        <Button variant="contained" onClick={() => table.setPageIndex(0)}>
          First page
        </Button>

        <Button
          variant="contained"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous page
        </Button>

        <Button
          variant="contained"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next page
        </Button>

        <Button
          variant="contained"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last page
        </Button>
      </div>
    </div>
  );
}
