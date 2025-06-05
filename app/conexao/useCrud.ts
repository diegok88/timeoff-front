// ../conexao/useCrud.ts
import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { api } from "../biblioteca/axios";
import SolQtd from "../interface/solqtd";

export function useCRUD<T>(baseUrl: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T[]>([]); // For endpoints returning arrays

  const handleRequest = async <D = any>(
    method: "get" | "post" | "put" | "patch" | "delete",
    endpoint: string = "",
    payload?: D,
    config?: AxiosRequestConfig
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        method,
        url: `${baseUrl}${endpoint ? `/${endpoint}` : ""}`,
        data: payload,
        ...config,
      });

      // For endpoints returning arrays, ensure data is an array
      const responseData = Array.isArray(response.data) ? response.data : [response.data];
      setData(responseData);
      return responseData;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Specialized handler for countByStatus with sodusu parameter
  const countByStatus = async (sodusu: number): Promise<SolQtd> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        method: "get",
        url: `${baseUrl}/count-by-status`,
        params: { sodusu }, // Pass sodusu as query parameter
      });

      return {
        aceito: Number(response.data.aceito) || 0,
        pendente: Number(response.data.pendente) || 0,
        recusado: Number(response.data.recusado) || 0,
      };
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAll = () => handleRequest("get");
  const getById = (id: number | string) => handleRequest("get", String(id));
  const getByUsuarioId = (sodusu: number) => handleRequest("get", `usuario/${sodusu}`);
  const create = <D>(item: D) => handleRequest("post", "", item);
  const update = <D>(id: number | string, item: D) => handleRequest("put", String(id), item);
  const remove = (id: number | string) => handleRequest("delete", String(id));

  return {
    data,
    loading,
    error,
    getAll,
    getById,
    getByUsuarioId,
    countByStatus,
    create,
    update,
    remove,
  };
}