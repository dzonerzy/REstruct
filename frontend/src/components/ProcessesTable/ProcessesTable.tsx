'use client';

import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import type { GoApiErr, Process } from "../components.types";
import useGo from "../../api/useGo";

export default function ProcessesTable() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [error, setError] = useState<GoApiErr>("");

  const {GetProcesses} = useGo(setProcesses, setError);

  useEffect(() => {
    GetProcesses();
  }, [])

  return (error ? <h1 className="bg-red-600">{error}</h1> :
    <div className="overflow-x-auto">
      <Table striped hoverable>
        <Table.Head>
          <Table.HeadCell>PID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Arch</Table.HeadCell>
        </Table.Head>
        
        <Table.Body className="divide-y">
        {!processes.length
          ? <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 even:bg-opacity-50 dark:even:bg-opacity-50">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">No Processes</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">No Processes</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">No Processes</Table.Cell>
            </Table.Row> 
          : processes.map(({pid, name, arch}, i) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 even:bg-opacity-50 dark:even:bg-opacity-50">
                <Table.Cell className="whitespace-nowrap font-medium text-yellow-300 dark:text-yellow">{pid}</Table.Cell>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{arch}</Table.Cell>
              </Table.Row>
            )
          )
        }
        </Table.Body>
      </Table>
    </div>
  );
}
