# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build taskaria-ol`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t taskaria-ol`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system taskaria-ol && \
          adduser --system -G taskaria-ol taskaria-ol

COPY dist/apps/taskaria-ol taskaria-ol
RUN chown -R taskaria-ol:taskaria-ol .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix taskaria-ol --omit=dev -f install

CMD [ "node", "taskaria-ol" ]
