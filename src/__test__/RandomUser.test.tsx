import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import RandomUser from "../components/RandomUser/RandomUser";
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("<RandomUser/>", () => {
  test.only("loads user when click on the button", async () => {
    render(<RandomUser />);
    mockedAxios.get.mockResolvedValueOnce({ data: MOCK_USER_RESPONSE });
    const button = screen.getByRole("button");

    fireEvent.click(button);
    let titleElement = await screen.findByRole("heading", { level: 2 });
    let paragraphElement = await screen.findByRole("paragraph");
    expect(titleElement.textContent).toBe("Lewis Gutierrez");
    expect(paragraphElement.textContent).toBe("lewis.gutierrez@example.com");
    mockedAxios.get.mockResolvedValueOnce({ data: MOCK_USER_RESPONSE_2 });

    fireEvent.click(button);
    titleElement = await screen.findByRole("heading", { level: 2 });
    paragraphElement = await screen.findByRole("paragraph");
    expect(titleElement.textContent).toBe("Duc Cuong");
    expect(paragraphElement.textContent).toBe("pdcbkvn@gmail.com");
  });
});

const MOCK_USER_RESPONSE = {
  results: [
    {
      gender: "male",
      name: {
        title: "Mr",
        first: "Lewis",
        last: "Gutierrez",
      },
      location: {
        street: {
          number: 1512,
          name: "Country Club Rd",
        },
        city: "Geelong",
        state: "Victoria",
        country: "Australia",
        postcode: 4198,
        coordinates: {
          latitude: "-84.7625",
          longitude: "-16.8415",
        },
        timezone: {
          offset: "-4:00",
          description: "Atlantic Time (Canada), Caracas, La Paz",
        },
      },
      email: "lewis.gutierrez@example.com",
      login: {
        uuid: "a54215c4-073a-4a1c-8cad-563cbf6d5ea3",
        username: "redswan414",
        password: "rockon",
        salt: "cBoOOhUa",
        md5: "712a6000bf42009fcabc1860005f583f",
        sha1: "4e2d6f7b67d17edaa2b7a8ecf91ed4ace9f5614e",
        sha256:
          "93df313f5c41852709b334095a4e96b887238a90a87d1fdd234ee1c5f1ff6cf7",
      },
      dob: {
        date: "1967-06-07T05:21:48.382Z",
        age: 57,
      },
      registered: {
        date: "2006-05-15T08:12:51.461Z",
        age: 18,
      },
      phone: "07-9383-9624",
      cell: "0453-358-301",
      id: {
        name: "TFN",
        value: "132327806",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/75.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/75.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
      },
      nat: "AU",
    },
  ],
  info: {
    seed: "aa45fac9b9bf671a",
    results: 1,
    page: 1,
    version: "1.4",
  },
};

const MOCK_USER_RESPONSE_2 = {
  results: [
    {
      gender: "female",
      name: {
        title: "Mr",
        first: "Duc",
        last: "Cuong",
      },
      location: {
        street: {
          number: 1512,
          name: "Country Club Rd",
        },
        city: "Geelong",
        state: "Victoria",
        country: "Australia",
        postcode: 4198,
        coordinates: {
          latitude: "-84.7625",
          longitude: "-16.8415",
        },
        timezone: {
          offset: "-4:00",
          description: "Atlantic Time (Canada), Caracas, La Paz",
        },
      },
      email: "pdcbkvn@gmail.com",
      login: {
        uuid: "a54215c4-073a-4a1c-8cad-563cbf6d5ea3",
        username: "redswan414",
        password: "rockon",
        salt: "cBoOOhUa",
        md5: "712a6000bf42009fcabc1860005f583f",
        sha1: "4e2d6f7b67d17edaa2b7a8ecf91ed4ace9f5614e",
        sha256:
          "93df313f5c41852709b334095a4e96b887238a90a87d1fdd234ee1c5f1ff6cf7",
      },
      dob: {
        date: "1967-06-07T05:21:48.382Z",
        age: 57,
      },
      registered: {
        date: "2006-05-15T08:12:51.461Z",
        age: 18,
      },
      phone: "07-9383-9624",
      cell: "0453-358-301",
      id: {
        name: "TFN",
        value: "132327806",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/75.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/75.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
      },
      nat: "AU",
    },
  ],
  info: {
    seed: "aa45fac9b9bf671a",
    results: 1,
    page: 1,
    version: "1.4",
  },
};
