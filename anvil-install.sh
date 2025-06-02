  curl -L https://foundry.paradigm.xyz | bash
  source ~/.zshenv
  foundryup
  ## Need to make sure 'gh' is isntalled. Command is: brew install gh
  gh attestation verify --owner foundry-rs $(which forge)
