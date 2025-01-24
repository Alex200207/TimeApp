import { renderHook } from "@testing-library/react";
import useGetWeather from "../../hooks/useGetWeather";

describe("Pruebas een el Hook useGetWeather", () => {
  test("debe iniciar los valores prederterminados", () => {
    const { result } = renderHook(() =>
      useGetWeather({ name: "ocotal", country: "NI" })
    );
    expect(result.current.weather).toBeNull();
    expect(result.current.loading).toBe(true);
  });

  test("debe mostrar mostrar un error si los valores son incorrectors ", () => {
    const { result } = renderHook(() =>
      useGetWeather({ name: "ocotal", country: "NI" })
    );
    expect(result.current.weather).toBeNull();
    expect(result.current.loading).toBe(true);
  });
});
