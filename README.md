# proxier

[![Build Status](https://travis-ci.com/knowbee/proxier.svg?token=yN9jXnk59suszMqNsJJb&branch=master)](https://travis-ci.com/knowbee/proxier)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

CLI tool that sets proxy configuration for npm, yarn and git

### Installation

```
npm install -g proxier
```

```
yarn global add proxier
```

## Usage

::

    Usage: proxier [options]

      set/remove proxy configurations for npm, yarn and git

    Options:

      --version,  -V      output the version number
      --set,      set,    required option to set proxy configurations
      --npm,      npm,    set npm proxy configurations
      --yarn,     yarn,   set yarn proxy configurations
      --git,      git,    set git proxy configurations
      --remove,   remove required option to remove proxy configurations

      -h,         --help        output usage information

    Example:

      proxier --set npm yarn git http://example.com:5555

      proxier --remove npm yarn git

## Contribution

- Please before making a PR, read first this [Contributing Guideline](./CONTRIBUTING.md)

## License

MIT

## Author
