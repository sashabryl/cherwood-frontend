import { Cherwood } from "./helpers/Cherwood"; 
import { Option } from "./helpers/Options";
import { UserType } from "./helpers/UserType";
import { CartItem } from "./helpers/ChartInterface";
import axios from "axios";
import { BookingItem } from "./helpers/BookingInterface";

// export async function getCherwood(): Promise<Cherwood[]> {
//   return wait(500)
//     .then(() => {
//       const jsonData = cherwoodData as Cherwood[];
//       return Promise.resolve(jsonData);
//     });
// } 

export async function getCherwood(): Promise<Cherwood[]> {
  const apiUrl = 'https://cherwood-backend-cold-river-1843-quiet-breeze-3861.fly.dev/api/products/';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: Cherwood[]) => {
      return Promise.resolve(jsonData);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}

export const LogOut = async (access) => {
  try {
    const data = {
      refresh: access,
    };

    const url = 'https://cherwood-backend-cold-river-1843-quiet-breeze-3861.fly.dev/api/user/logout/';
    await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  } 
};

export async function getChart(): Promise<CartItem> {
  const apiUrl = 'https://cherwood-backend-cold-river-1843-quiet-breeze-3861.fly.dev/api/cart/';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: CartItem) => {
      return Promise.resolve(jsonData);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}

export async function getUser(access): Promise<UserType> {
  const apiUrl = 'https://cherwood-backend-cold-river-1843-quiet-breeze-3861.fly.dev/api/user/me/';

  const accessToken = access;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: new Headers(headers),
  };

  return fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: UserType) => {
      return Promise.resolve(jsonData);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}

export async function getBooking(access): Promise<BookingItem[]> {
  const apiUrl = 'https://cherwood-backend-cold-river-1843-quiet-breeze-3861.fly.dev/api/user/orders/';

  const accessToken = access;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: new Headers(headers),
  };

  return fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: BookingItem[]) => {
      return Promise.resolve(jsonData);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}



// export async function getOptions(): Promise<Option[]> {
//   return wait(500)
//     .then(() => {
//       const jsonData2 = options as Option[];
//       return Promise.resolve(jsonData2);
//     });
// }

export async function getOptions(): Promise<Option[]> {
  const apiUrl = 'https://cherwood-backend-cold-river-1843-quiet-breeze-3861.fly.dev/api/categories/';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: Option[]) => {
      return Promise.resolve(jsonData);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}


export const handleChart = async (currentAction: string, id: number) => {
  try {
    const data = {
      product_id: id,
      action: currentAction,
    };

    const url = 'https://cherwood-backend-cold-river-1843-quiet-breeze-3861.fly.dev/api/cart/';

    await axios.post(url, data);
  } catch (error) {
    console.log(error);
  }
};
