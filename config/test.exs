import Config

# Print only warnings and errors during test
config :logger, level: :warning

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :melyssa_art, MelyssaArtWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "APDbciYT+3AaacqBJtADYw++Dj867wlI5ztY2o/516DuzSdt9UZCkLL//BVo5XnD",
  server: false

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

# Enable helpful, but potentially expensive runtime checks
config :phoenix_live_view,
  enable_expensive_runtime_checks: true
