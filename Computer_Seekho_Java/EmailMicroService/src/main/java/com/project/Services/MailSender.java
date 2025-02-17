package com.project.Services;

// import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.mail.Message;
import jakarta.mail.Multipart;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;

import java.util.Map;
import java.util.Properties;
import java.nio.file.Files;
import java.nio.file.Paths;

@Component
public class MailSender {
    // @Value("${email.id}")
    private String emailId = "computerseekho2025@gmail.com";
    // @Value("${email.password}")
    private String password = "uqknkgmutwmxuxju";


    public void sendMail(String to, String studentName) {

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new jakarta.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(emailId, password);
            }
        });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject("Confirmation of Admission in Computer Seekho");
            
            String emailTemplate = new String(Files.readAllBytes(Paths.get("src/main/resources/emailTemplate.html")));
            
            emailTemplate = emailTemplate.replace("${studentName}", studentName);

            MimeBodyPart htmlMimeBodyPart = new MimeBodyPart();
            htmlMimeBodyPart.setContent(emailTemplate, "text/html");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(htmlMimeBodyPart);

            message.setContent(multipart);
            Transport.send(message);

        } catch (Exception e) {
            System.out.println("There was a problem sending the email");
        }
    }

    public void sendReceiptEmail(Map<String, Object> paymentDetails) {
    String to = (String)paymentDetails.get("email");
    String studentName = (String)paymentDetails.get("studentName");
    String paymentAmount = (String) paymentDetails.get("amount");
    String paymentMethod = (String) paymentDetails.get("Type");
    String paymentDate = (String) paymentDetails.get("date");
    String paymentID = (String) paymentDetails.get("paymentId");

    Properties props = new Properties();
    props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.port", "587");

    Session session = Session.getInstance(props,
        new jakarta.mail.Authenticator() {
          protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(emailId, password);
          }
        });

    try {
      // Create a new email message
      MimeMessage message1 = new MimeMessage(session);
      message1.setRecipients(Message.RecipientType.TO,
          InternetAddress.parse(to));
      message1.setSubject("Payment Received");

      // Read the HTML template from a file
      String emailTemplate = new String(Files.readAllBytes(Paths.get("src/main/resources/receiptTemplate.html")));
      System.out.println("receiptTemplate");

      // Replace placeholders with actual values
      emailTemplate = emailTemplate.replace("${studentName}", studentName);
      emailTemplate = emailTemplate.replace("${paymentID}", paymentID);
      emailTemplate = emailTemplate.replace("${paymentAmount}", paymentAmount);
      emailTemplate = emailTemplate.replace("${paymentMethod}", paymentMethod);
      emailTemplate = emailTemplate.replace("${paymentDate}", paymentDate);

      // Create the HTML part
      MimeBodyPart htmlPart = new MimeBodyPart();
      htmlPart.setContent(emailTemplate, "text/html");

      // Create a multipart message
      MimeMultipart multipart = new MimeMultipart();
      multipart.addBodyPart(htmlPart);

      // Set the multipart content to the message
      message1.setContent(multipart);

      // Send the email
      Transport.send(message1);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
