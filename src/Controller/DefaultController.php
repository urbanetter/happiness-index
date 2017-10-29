<?php

namespace App\Controller;


use GuzzleHttp\Client;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    public function index()
    {
        return $this->render('index.html.twig');
    }

    public function happiness(Request $request)
    {
        $key = $this->container->getParameter('key');
        $client = new Client();

        $imageData = $request->request->get('base64data');
        $body = base64_decode(substr($imageData, strpos($imageData, ',') + 1));

        $response = $client->request(
            'POST',
            'https://northeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion,age,gender',
            [
                'headers' => [
                    'Content-Type' => 'application/octet-stream',
                    'Ocp-Apim-Subscription-Key' => $key
                ],
                'body' =>  $body
            ]
        );

        return new JsonResponse($response->getBody(), 200, [], true);
    }
}