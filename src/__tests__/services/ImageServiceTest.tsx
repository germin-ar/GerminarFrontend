import { ImageService } from "../../services/ImageService"; // Ajusta la ruta a tu archivo
import { Photo } from "@/interfaces/index"; // Ajusta la ruta a tu interfaz Photo

jest.mock('node-fetch'); // Mockeamos la función fetch

describe.only("ImageService", () => {
  const apiHost = "https://api.example.com";
  const service = new ImageService(apiHost);

  beforeEach(() => {
    jest.clearAllMocks();
    // Simular el localStorage para el test
    global.localStorage.setItem('access_token', 'test_token');
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Limpiar el localStorage después de cada test
    global.localStorage.removeItem('access_token');
  });

  it("save image success", async () => {
    const mockResponse: Photo = {
        url: "https://example.com/image.jpg",
        id: "",
        file_path: "",
        is_public: false
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        status: 200,
        ok: true,
      } as Response)
    ) as jest.Mock;

    const body = { key: "value" }; //en lugar de FormData

    const response = await service.saveImage(body as any); // Cast para ajustar el tipo

    // Verificar que la respuesta es la esperada
    expect(response).toEqual(mockResponse);

    // Verificar que fetch fue llamada con los parámetros correctos
    expect(fetch).toHaveBeenCalledWith(`${apiHost}/api/v1/images`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test_token'
      },
      body: body as any
    });
  });

  it('save image with error response', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Error occurred' }),
        status: 401,
        ok: false,
      } as Response)
    ) as jest.Mock;

    const body = { key: "value" }; // Usar un objeto normal en lugar de FormData

    await expect(service.saveImage(body as any)).rejects.toEqual({
      code: 'NotAuthorizedException',
      message: 'Error occurred'
    });
  });
});
