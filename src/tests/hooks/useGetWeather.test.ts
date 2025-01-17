import { renderHook } from "@testing-library/react";
import useGetWeather from "../../hooks/useGetWeather";

describe("Pruebas een el Hook useGetWeather", () => {
  test("debe iniciar los valores prederterminados", () => {
    // prueba para verificar que los valores iniciales sean los correctos
    const { result } = renderHook(() =>
      useGetWeather({ name: "ocotal", country: "NI" })
    ); // renderizamos el hook useGetWeather
    expect(result.current.weather).toBeNull(); // esperamos que el valor de weather sea null
    expect(result.current.loading).toBe(true); // esperamos que el valor de loading sea true
  });
});

