import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

const SUPPORTED_NETWORKS = {
  linkedin: 'linkedin',
  github: 'github',
};

interface IProfileNetwork {
  network: string;
  username: string;
  url: string;
}

interface ISupportedNtwkDefaultState {
  [key: string]: IProfileNetwork;
}

const SUPPORTED_NETWORK_DEFAULT_STATE: ISupportedNtwkDefaultState = {
  linkedin: {
    network: 'linkedin',
    username: 'richiezhou',
    url: '',
  },
  github: {
    network: 'github',
    username: 'richiezhou',
    url: '',
  },
};

const Links = ({
  basicTabs,
  onChangeHandler,
}: {
  basicTabs: any;
  onChangeHandler: (value: any, key: string) => void;
}) => {
  const [networks, setNetworks] = useState(SUPPORTED_NETWORK_DEFAULT_STATE);

  useEffect(() => {
    const defaultNetworks = { ...SUPPORTED_NETWORK_DEFAULT_STATE };
    Object.keys(SUPPORTED_NETWORKS).forEach((ntwk) => {
      const matchedNetwork = basicTabs.profiles.find(
        (profile: IProfileNetwork) => profile.network === ntwk
      );
      if (matchedNetwork) {
        defaultNetworks[ntwk] = matchedNetwork;
      }
    });
    setNetworks(defaultNetworks);
    onChangeHandler(Object.values(defaultNetworks), 'profiles');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onURLChange = (value: string, network: string) => {
    const profiles = basicTabs.profiles;
    const matchedNetwork = profiles.find((profile: IProfileNetwork) => profile.network === network);
    matchedNetwork.url = value;
    onChangeHandler(profiles, 'profiles');
  };

  return (
    <Fragment>
      <TextField
        label="LinkedIn"
        variant="filled"
        value={networks[SUPPORTED_NETWORKS.linkedin].url}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onURLChange(event.target.value, SUPPORTED_NETWORKS.linkedin);
        }}
      />
      <TextField
        label="Github"
        variant="filled"
        value={networks[SUPPORTED_NETWORKS.github].url}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onURLChange(event.target.value, SUPPORTED_NETWORKS.github);
        }}
      />
    </Fragment>
  );
};

export default Links;
