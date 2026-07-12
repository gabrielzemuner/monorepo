import { isAxiosError } from "axios";
import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

interface SubmitOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useForm<T>(initialData: T) {
  const [data, setDataState] = useState(initialData);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Errors<T>>({});

  function setData<K extends keyof T>(key: K, value: T[K]) {
    setDataState((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setDataState(initialData);
    setErrors({});
  }

  async function submit(
    requestFn: (data: T) => Promise<unknown>,
    options: SubmitOptions,
  ) {
    setProcessing(true);
    setErrors({});

    try {
      await requestFn(data);
      options.onSuccess?.();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 422) {
        const laravelErrors = error.response?.data.errors as Record<
          string,
          string[]
        >;
        const mapped: Errors<T> = {};
        Object.entries(laravelErrors).forEach(([field, messages]) => {
          mapped[field as keyof T] = messages[0];
        });
        setErrors(mapped);
      }
      options.onError?.();
    } finally {
      setProcessing(false);
    }
  }

  return { data, setData, processing, errors, reset, submit };
}
