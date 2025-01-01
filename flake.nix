{
  description = "Kazoo Svelte + Tone.js app";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.11";  # Nixpkgs 24.11
    flake-utils.url = "github:numtide/flake-utils";     # Import flake-utils library
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        mkShell = pkgs.mkShell;
      in
      {
        devShells.default = mkShell {
          buildInputs = [
            pkgs.nodejs_23
            pkgs.nodePackages.npm
          ];

          shellHook = ''
            echo "Welcome to the Kazoo Svelte App Development Shell!"
          '';
        };
      });
}
