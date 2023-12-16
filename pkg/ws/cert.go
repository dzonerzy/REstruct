package ws

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"fmt"
	"math/big"
	"os"
)

func genRandomSerialNumber() (*big.Int, error) {
	// generate random serial number
	serialNumberLimit := new(big.Int).Lsh(big.NewInt(1), 128)
	sn, err := rand.Int(rand.Reader, serialNumberLimit)
	if err != nil {
		return nil, err
	}
	return sn, nil
}

func generateCertificate() error {
	// generate private key
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	serial, err := genRandomSerialNumber()
	if err != nil {
		return err
	}

	certTemplate := x509.Certificate{
		SerialNumber:                big.NewInt(1),
		Subject:                     pkix.Name{

		}
		NotBefore:                   nil,
		NotAfter:                    nil,
		KeyUsage:                    nil,
		ExtKeyUsage:                 nil,
		UnknownExtKeyUsage:          nil,
		BasicConstraintsValid:       false,
		IsCA:                        false,
		MaxPathLen:                  0,
		MaxPathLenZero:              false,
		SubjectKeyId:                nil,
		AuthorityKeyId:              nil,
		DNSNames:                    nil,
		PermittedDNSDomainsCritical: false,
		PermittedDNSDomains:         nil,
		SignatureAlgorithm:          0,
		PublicKeyAlgorithm:          0,
		PublicKey:                   nil,
		Signature:                   nil,
		Extensions:                  nil,
		ExtraExtensions:             nil,
		Version:                     0,
		Issuer:                      nil,
	}

	// create certificate
	cert, err := x509.CreateCertificate(rand.Reader, &certTemplate, &certTemplate, &privateKey.PublicKey, privateKey)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
