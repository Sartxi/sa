import { createContext, useState } from "react";

const DataContext = createContext({ data: null, setData: (data: any) => { } });

export const ContentProvider = ({ children }: { children: any }) => {
  const [data, setData] = useState<any>(null);
  const contentProps: any = { data, setData };
  return (
    <DataContext.Provider value={contentProps}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
