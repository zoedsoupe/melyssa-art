import Config

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configures the endpoint
config :melyssa_art, MelyssaArtWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [html: MelyssaArtWeb.ErrorHTML],
    layout: false
  ],
  pubsub_server: MelyssaArt.PubSub,
  live_view: [signing_salt: "Z++3GvTJ"]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, JSON

import_config "#{config_env()}.exs"
