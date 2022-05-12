import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Web3 from 'web3';
import Swal from 'sweetalert2';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthWeb3Service {
  web3: any = null;
  get web3Instance() { return this.web3; }

  chainIds: string[] = ['0x1'];
  addressUser: any = new BehaviorSubject<string>('');
  loginUser: any = new BehaviorSubject<boolean>(false);

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tienes instalado MetaMask!'
      });
    }
  }

  connect() {
    this.handleIdChainChanged();
  }

  async handleIdChainChanged() {
    const chainId: string = await window.ethereum.request({ method: 'eth_chainId' });

    if (this.chainIds.includes(chainId)) {
      this.handleAccountsChanged();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecciona la red principal de Ethereum (Mainet)'
      });
    }

    window.ethereum.on('chainChanged', (res: string) => {
      if (!this.chainIds.includes(res)) {
        this.logout();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Selecciona la red principal de Ethereum (Mainet)'
        });
      } else {
        if (this.addressUser.getValue() === '') {
          this.handleAccountsChanged();
        } else {
          this.authBackend();
        }
      }
    });
  }

  async handleAccountsChanged() {
    const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    this.addressUser.next(accounts[0]);
    this.authBackend();

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      this.addressUser.next(accounts[0]);
      this.authBackend();
    });
  }

  async authBackend() {
    // => IF Success auth api backend
    this.loginUser.next(true);

    // => IF Failed auth api backend d
    //this.logout();
  }

  logout() {
    this.loginUser.next(false);
  }
}
