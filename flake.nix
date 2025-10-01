{
  description = "HyHyve Client SDK";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, ... }@inputs:
    with inputs;
    let
      # System types to support.
      supportedSystems = [
        "x86_64-linux"
        "x86_64-darwin"
        "aarch64-linux"
        "aarch64-darwin"
      ];

      # Helper function to generate an attrset '{ x86_64-linux = f "x86_64-linux"; ... }'.
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

      # Nixpkgs instantiated for supported system types.
      nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; });

    in
    {

      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgsFor.${system};
          common = {
            buildInputs = with pkgs; [
              # Build tools
              just
              bun
              concurrently
              bash
              npm-check-updates
            ];
          };
        in
        {
          default = pkgs.mkShell (
            common
            // {
              shellHook = ''
                echo "
                    HyHyve Client SDK Dev Shell
                    
                    Available commands:
                      just build          - Build the SDK
                      just dev            - Development mode with watch
                      just example        - Run example application
                      just typecheck      - Type checking
                      
                    To get started run \`bun install\` and \`just build\`.
                    "
              '';
            }
          );

        }
      );

    };
}
