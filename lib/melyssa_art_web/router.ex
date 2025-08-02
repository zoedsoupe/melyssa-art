defmodule MelyssaArtWeb.Router do
  use MelyssaArtWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :put_root_layout, html: {MelyssaArtWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end
end
