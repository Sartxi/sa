export const getMapObject = () => {
  return `Object.entries(Obj).map(([key, value]) => {\n  return { key, value };\n});`;
};

export const getMapEnum = () => {
  return `Object.keys(Enum).map((key: string) => Enum[key as keyof typeof Enum]);`;
};

export const getReduceMulti = () => {
  return `function processResults(requests) {\n  const reduceResults = (res) => res.reduce((results, req) => {\n    results[!req.error ? 'success' : 'error'].push(req);\n    return results;\n  }, { success: [], error: [] });\n  return reduceResults(requests);\n};`;
};

export const getReducePromise = () => {
  return `async function resolveAll(promises) {\n  const results = await promises.reduce(async (init, prop) => {\n    const result = await init;\n    const promise = await callPromise(prop);\n    if (promise.ok) result.success.push(promise);\n    else result.error.push(promise);\n    return result;\n  }, Promise.resolve({ success: [], error: [] }));\n  return results;\n};`;
};
