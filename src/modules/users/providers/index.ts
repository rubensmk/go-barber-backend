import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
