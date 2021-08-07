FROM  golang:1.16-alpine AS build

WORKDIR /go/src/app
COPY . .
RUN go mod init
RUN go build -o hello

FROM scratch AS bin
COPY --from=build /go/src/app /
CMD ["./hello"]
