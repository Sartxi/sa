import { useEffect, useState } from "react";

export function Loading({ complete }: { complete: any; }) {
  const [progress, setProgress] = useState('start');

  useEffect(() => {
    console.log('setting up');
    setTimeout(() => {
      complete(true);
    }, 3000);
  }, []);

  return (
    <div className="loading-screen">
      {progress}
    </div>
  )
}
